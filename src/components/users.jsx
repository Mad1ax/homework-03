import React, {useState} from 'react'
import api from "../API";

const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const renderPhrase = (number) => {
        if (number.length > 1 && number.length < 5) {
            return <h1>{number.length} человека тусанут с тобой сегодня</h1>
        } else if (number.length > 0) {
            return <h1>{number.length} человек тусанёт с тобой сегодня</h1>
        } else {
            return <h1>Никто с тобой не тусанёт</h1>
        }
    }

    return  <>
        {renderPhrase(users)}
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качество</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оцека</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => {
                return (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                            {user.qualities.map((item) => (
                                <span
                                    className={
                                        "badge m-1 bg-" + item.color
                                    }
                                    key={item._id}
                                >
                                            {item.name}
                                        </span>
                            ))}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td>
                            <button
                                className={"btn btn-danger"}
                                onClick={() => handleDelete(user._id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
        ;
    </>
}

export default Users


