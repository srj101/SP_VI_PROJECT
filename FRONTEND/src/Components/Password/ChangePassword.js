import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../API/config";
import { AuthContext } from "../../Context/AuthProvider";
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
    const navigate = useNavigate();
    const alert = useAlert()
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            alert.error("Password does not match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/v1/user/changePassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    password,
                }),


            });
            const data = await response.json();
            console.log(data);

            alert.success("Password changed successfully");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert.error(error.message);
            setLoading(false);
        }
    };

    return (

        <div className='py-10'>
            <h1>Change Password</h1>
            <div className='flex gap-3 '>
                <div className='w-full'>
                    <input
                        type='password'
                        password={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength='6'
                        placeholder='Password'
                        className='input input-bordered input-secondary w-full my-3'
                    />
                    {errors.password && (
                        <p className='text-red-500'>{errors.password.message}</p>
                    )}
                </div>
                <div className='w-full'>
                    <input
                        type='password'
                        password={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        className='input input-bordered input-secondary w-full my-3'
                    />
                    {errors.confirmpassword && (
                        <p className='text-red-500'>{errors.confirmpassword.message}</p>
                    )}
                </div>
            </div>
            <div className='flex items-center justify-center my-5'>
                <label>
                    <input
                        className='btn bg-primary hover:bg-blue-700 mr-3'
                        value='Save'
                        type='submit'
                        disabled={loading}
                        onClick={handlePasswordChange}
                    />
                </label>
                <label>
                    <input
                        className='btn bg-red-700 hover:bg-red-800 mr-3'
                        value='Cancel'
                        type='reset'
                        disabled={loading}
                        onClick={() => {
                            setPassword("");
                            setConfirmPassword("");
                            navigate("/main/profileUser");
                        }}
                    />
                </label>
            </div>
        </div>

    );
};

export default ChangePassword;
