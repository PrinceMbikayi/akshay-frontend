import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [ID_national, setIDNational] = useState('');
    const [RCCM, setRCCM] = useState('');

    const navigate = useNavigate();

    const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role || 'customer');
            setIDNational(user?.ID_national || '');
            setRCCM(user?.RCCM || '');
        }

        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Profile updated successfully");
            navigate("/me/profile");
        }
    }, [user, error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            role,  // The role is already set and not changeable
        };

        // Include ID_national and RCCM only if the role is 'seller'
        if (role === 'seller') {
            userData.ID_national = ID_national;
            userData.RCCM = RCCM;
        }

        updateProfile(userData);
    };

    return (
        <UserLayout>
            <MetaData title={'Update Profile'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-8 mt-5">
                    <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                        <h2 className="mb-4">Update Profile</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* If user is a seller, show the additional fields */}
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
                                        onChange={(e) => setIDNational(e.target.value)}
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
                                        onChange={(e) => setRCCM(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="btn update-btn w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default UpdateProfile;