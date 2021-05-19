import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Add = (props) => {
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState(false);
    const [detail,setDetail] = useState(false);

    // Form
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');


    useEffect(() => {
        const loadData = async () => {

        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username : username,
            password : password,
        }
        try{
            const response = await axios.post('http://localhost:5001/user/register',data);
            const responseHakAkses = await axios.get('http://localhost:5001/hak_akses/show_all');
            for(var a = 0; a < responseHakAkses.data.length; a++){
                const dataHakAksesUser = {
                    user_id : response.data.user_id,
                    hak_akses_id : responseHakAkses.data[a].hak_akses_id
                }
                await axios.post('http://localhost:5001/hak_akses_user/register',dataHakAksesUser);
            }
            alert('User berhasil di daftarkan');
            props.history.goBack();
       }catch(error){
            console.log(error);
       }
    }

    return (
        <div className = "container" style = {{marginTop : 62}}>
            <div className="row" style={{position:'relative'}}>
                <Link to="/index_manajemen_akun" className="btn btn-outline-secondary col-1" style={{position:'absolute',top:'15px'}}>Kembali</Link>
                <h1 className="text-center border-bottom pt-2 pb-2 fw-bold col">Tambah Akun</h1>
            </div>

            <form className="row" onSubmit={handleSubmit}>
                <div className="col-6 mx-auto">
                    <div className="form-floating mb-3">
                        <input type="text" value={username} className="form-control" id="username" placeholder="Username" autoComplete="off" onChange = {(e) => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={password} className="form-control" id="password" placeholder="Password" autoComplete="off" onChange = {(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-5 w-100">Tambah</button>
                </div>

            </form>
        </div>
    )
}

export default Add