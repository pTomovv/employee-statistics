import { sortPairs } from '../../utils/sortUtil';
import styles from './Table.module.css';

const Table = ({ data, onClick }) => {
    sortPairs(data);

    return (
        <table>
            <thead>
                <tr>
                    <th>Pair of Employees</th>
                    <th>Total Time Worked Together</th>
                </tr>
            </thead>
            <tbody>
                {data.map((pair, index) => {
                    return (
                        <tr
                            key={index}
                            onClick={() => onClick(pair.commonProjects)}
                            title="Click to see details"
                            className={styles.row}
                        >
                            <td>
                                {pair.employees[0]} and {pair.employees[1]}
                            </td>
                            <td>{pair.totalDaysWorkedTogether} days</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
