import React,{useEffect, useState} from 'react'
import { useHistory,Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();
    const [refresh,setRefresh] = useState(false);


    const [idPenyesuaian,setIdPenyesuaian] = useState('');
    const [dataPenyesuaianDetail,setDataPenyesuaianDetail] = useState([]);
    const [tanggalPenyesuaian,setTanggalPenyesuaian] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseDataPenyesuaianDetail = await axios.get(`http://localhost:5001/penyesuaian_detail/show_detail/${detail.id_penyesuaian}`)
                setDataPenyesuaianDetail(responseDataPenyesuaianDetail.data);
                setIdPenyesuaian(detail.id_penyesuaian);
                setTanggalPenyesuaian(detail.tanggal_penyesuaian);
            }catch(error){

            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewData = dataPenyesuaianDetail ? dataPenyesuaianDetail.map((list,index) => {
        return (
            <tr key={index}>
                <td className="p-3">
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(list)}>Hapus</button>
                    <Link to={{ pathname : '/edit_barang_penyesuaian',state : list }}className="btn btn-outline-success mx-1">Edit</Link>
                </td>
                <td className="p-3">{list.id_barang}</td>
                <td className="p-3">{list.Barang_Header.nama_barang}</td>
                <td className="p-3">{list.jumlah_sistem}</td>
                <td className="p-3">{list.jumlah_fisik}</td>
                <td className="p-3">{list.penyesuaian}</td>
            </tr>
        )
    }) : null;

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:5001/penyesuaian_detail/delete/${idPenyesuaian}/${e.id_barang}`);
            setRefresh(!refresh);
            alert('Barang berhasil di hapus');
        }catch(error){
            console.log(error);
        }
    }

    const handleBack = async (e) => {
        if(dataPenyesuaianDetail.length < 1){
            try{
                await axios.delete(`http://localhost:5001/penyesuaian_header/delete/${idPenyesuaian}`);
            }catch(error){
                console.log(error);
            }
        }
        props.history.goBack();
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Detail Penyesuaian</h2>
                </div>
            </div>
            

            {/* List */}
            <div className="row">
                <div className="col-9">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th className="p-3"></th>
                                <th className="p-3">ID Barang</th>
                                <th className="p-3">Nama</th>
                                <th className="p-3">Stok Sistem</th>
                                <th className="p-3">Stok Fisik</th>
                                <th className="p-3">Penyesuaian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewData}
                        </tbody>
                    </table>
                    <div className="col-12 row">
                        <Link to={{ pathname : '/tambah_barang_penyesuaian',state : idPenyesuaian }} className = "col-5 mx-auto btn btn-success">Tambah Barang</Link>
                    </div> 
                </div>
                <div className="col-3">
                    <div className="row">
                        <div class="form-floating mb-3 px-0 mx-1">
                            <input type="date" class="form-control" value={tanggalPenyesuaian} onChange={(e) => setTanggalPenyesuaian(e.target.value)}/>
                            <label for="floatingInput">Tanggal Penyesuaian</label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <button className="btn btn-success w-100" disabled={ tanggalPenyesuaian == '' || dataPenyesuaianDetail.length < 1 ? true : false }>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index