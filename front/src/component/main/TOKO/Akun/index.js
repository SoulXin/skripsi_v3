import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = () => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/user/show_all');
                setData(response.data);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = data ? data.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">{list.user_id}</td>
                <td className="p-3">{list.username}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <Link to={{ pathname : '/detail_akun',state : list }} style={{position:'absolute',right : 10,bottom:10, padding: 5}} className="btn btn-outline-success">Detail</Link>
                </td>
            </tr>
        )
    }) : null;

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <h2 className="col-3">Manajemen Akun</h2>
                <Link to = "/tambah_akun" className="btn btn-outline-success col-2 mt-2">Tambah Akun</Link>
            </div>
            
               
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID User</th>
                            <th className="p-3">Username</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
