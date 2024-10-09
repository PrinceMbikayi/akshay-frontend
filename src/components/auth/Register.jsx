import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'

const Register = () => {
    // État pour les informations de l'utilisateur
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',  // Rôle par défaut
        ID_national: '',
        RCCM: ''
    });

    const { name, email, password, role, ID_national, RCCM } = user;

    const navigate = useNavigate();

    const [register, { isLoading, error, data }] = useRegisterMutation();

    const { isAuthenticated } = useSelector((state) => state.auth);

    console.log(data);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error, isAuthenticated, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        // Créer un objet de données d'inscription
        const signUpData = {
            name,
            email,
            password,
            role,
        };

        // Ajouter ID_national et RCCM seulement si le rôle est "seller"
        if (role === 'seller') {
            signUpData.ID_national = ID_national;
            signUpData.RCCM = RCCM;
        }

        register(signUpData);
    };

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <>
            <MetaData title={'Register'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5 mt-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Register</h2>

                        {/* Champ Nom */}
                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        {/* Champ Email */}
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        {/* Sélecteur de rôle */}
                        <div className="mb-3">
                            <label htmlFor="role_field" className="form-label">Role</label>
                            <select
                                id="role_field"
                                className="form-select"
                                name="role"
                                value={role}
                                onChange={onChange}
                            >
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        {/* Champs supplémentaires pour les vendeurs */}
                        {role === 'seller' && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="ID_national_field" className="form-label">ID National</label>
                                    <input
                                        type="text"
                                        id="ID_national_field"
                                        className="form-control"
                                        name="ID_national"
                                        value={ID_national}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="RCCM_field" className="form-label">RCCM</label>
                                    <input
                                        type="text"
                                        id="RCCM_field"
                                        className="form-control"
                                        name="RCCM"
                                        value={RCCM}
                                        onChange={onChange}
                                    />
                                </div>
                            </>
                        )}

                        {/* Bouton d'inscription */}
                        <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Creating..." : "REGISTER"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
