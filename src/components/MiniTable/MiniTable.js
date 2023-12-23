import { sortCommonProjects } from '../../utils/sortUtils';
import styles from './MiniTable.module.css';

const MiniTable = ({ commonProjects, activePair, onClose }) => {
    sortCommonProjects(commonProjects);
    return (
        <div className={styles.wrapper}>
            <h3>
                Common Projects of {activePair[0]} and {activePair[1]}
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Number of days worked on this project</th>
                    </tr>
                </thead>
                <tbody>
                    {commonProjects.map((project, index) => {
                        return (
                            <tr key={index} className={styles.row}>
                                <td>{project.id}</td>
                                <td>{project.daysWorkedOn} days</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={onClose} className={styles.closeBtn} title="Close">
                X
            </button>
        </div>
    );
};

export default MiniTable;
