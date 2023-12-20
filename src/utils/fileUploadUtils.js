function splitStringToArray(string) {
    return string.split(/(\r\n|\r|\n)/g);
}

function formatArrayToMatrix(array) {
    return array
        .filter((row) => row.trim().length !== 0)
        .map((row) => row.split(',').map((e) => e.trim()));
}

function matrixToArrayWithObjects(arr) {
    return arr.map((row) => {
        let [empId, projectId, startDate, endDate] = row;

        return {
            empId: Number(empId),
            projectId: Number(projectId),
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    });
}

function formatDate(date) {
    if (date === 'NULL') {
        date = new Date();
    }
    let dateObject = new Date(date);
    let month = '' + (dateObject.getMonth() + 1);
    let day = '' + dateObject.getDate();
    let year = dateObject.getFullYear();

    if (day.length < 2) {
        day = '0' + day;
    }
    if (month.length < 2) {
        month = '0' + month;
    }

    return [year, month, day].join('-');
}

function createEmpProfiles(data) {
    const empProfiles = [];
    data.forEach((row) => {
        let index = empProfiles.findIndex((emp) => {
            return emp.id === row.empId;
        });

        if (index === -1) {
            empProfiles.push({
                id: row.empId,
                projects: [
                    {
                        id: row.projectId,
                        startDate: row.startDate,
                        endDate: row.endDate,
                    },
                ],
            });
        } else {
            empProfiles[index].projects.push({
                id: row.projectId,
                startDate: row.startDate,
                endDate: row.endDate,
            });
        }
    });
    return empProfiles;
}

function createOptions(empProfiles) {
    const result = [];
    empProfiles.forEach((employee) => {
        result.push(employee.id);
    });
    return result;
}

function findEmpPairs(empProfiles) {
    const result = [];

    for (let i = 0; i < empProfiles.length - 1; i++) {
        for (let j = i + 1; j < empProfiles.length; j++) {
            const employee1 = empProfiles[i];
            const employee2 = empProfiles[j];

            const commonProjects = employee1.projects.filter((project1) =>
                employee2.projects.some(
                    (project2) =>
                        project1.id === project2.id &&
                        new Date(project1.startDate) <=
                            new Date(project2.endDate) &&
                        new Date(project1.endDate) >=
                            new Date(project2.startDate)
                )
            );
            if (commonProjects.length) {
                const commonProjectsIds = [];
                for (let i = 0; i < commonProjects.length; i++) {
                    commonProjectsIds.push({
                        id: commonProjects[i].id,
                    });
                }

                for (let i = 0; i < commonProjectsIds.length; i++) {
                    let projectId = commonProjectsIds[i].id;

                    const startDate1 = getDate(
                        employee1,
                        projectId,
                        'startDate'
                    );

                    const endDate1 = getDate(employee1, projectId, 'endDate');

                    const startDate2 = getDate(
                        employee2,
                        projectId,
                        'startDate'
                    );

                    const endDate2 = getDate(employee2, projectId, 'endDate');

                    const overlapStart = new Date();
                    overlapStart.setTime(
                        Math.max(startDate1.getTime(), startDate2.getTime())
                    );
                    const overlapEnd = new Date();
                    overlapEnd.setTime(
                        Math.min(endDate1.getTime(), endDate2.getTime())
                    );
                    const days = Math.ceil(
                        (overlapEnd - overlapStart) / (24 * 60 * 60 * 1000)
                    );
                    commonProjectsIds[i].daysWorkedOn = days;
                }

                const totalDaysWorkedTogether = commonProjectsIds.reduce(
                    (totalDays, project) => {
                        return totalDays + project.daysWorkedOn;
                    },
                    0
                );

                result.push({
                    employees: [employee1.id, employee2.id],
                    commonProjects: commonProjectsIds,
                    totalDaysWorkedTogether: totalDaysWorkedTogether,
                });
            }
        }
    }

    return result;
}

function getDate(employee, project, dateType) {
    let date = new Date(
        employee.projects.find((e) => e.id === project)[dateType]
    );
    return date;
}

function readFile(e, setPairs, setOptions, setFilterred) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const statisticsArr = splitStringToArray(reader.result);
            const statisticsMatrix = formatArrayToMatrix(statisticsArr);
            const inputData = matrixToArrayWithObjects(statisticsMatrix);
            const empProfiles = createEmpProfiles(inputData);
            const options = createOptions(empProfiles);
            setOptions(options);
            const pairs = findEmpPairs(empProfiles);
            setPairs(pairs);
            setFilterred(pairs);
        };
    }
}

export { readFile };
