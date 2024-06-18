import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyToken } from "../../../Utils/auth";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const navigate = useNavigate();

    const decodedToken = useVerifyToken();

    useEffect(() => {
        if (decodedToken && decodedToken.role !== 1) {
            navigate("/");
        }
    }, [decodedToken, navigate]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users", {
            method: "GET",
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to fetch users');
        })
        .then((userData) => {
            console.log(userData.data);
            setUsers(userData.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }, [needsRefresh]);

    const handleDelete = (event, userId) => {
        event.preventDefault();

        fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) {
                setNeedsRefresh(!needsRefresh);
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    };

    return (
        <>
            {decodedToken && decodedToken.role === 1 && (
                users.map((user) => (
                    <article className="admin" key={user.id}>
                        <h3 className="admin-name">{user.username}</h3>
                        <form className="admin-delete-form" onSubmit={(event) => handleDelete(event, user.id)}>
                            <Link className="admin-update-link" to={`/admin/user/update/${user.id}`}>Modifier</Link>
                            <button className="admin-delete-submit" type="submit">Supprimer</button>
                        </form>
                    </article>
                ))
            )}
        </>
    );
};

export default AllUsers;
