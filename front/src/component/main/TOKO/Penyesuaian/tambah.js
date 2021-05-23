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
                const responsePenyesuaianDetail = await axios.get(`http://localhost:5001/penyesuaian_detail/show_detail/${detail.id_penyesuaian}`);
                setDataPenyesuaianDetail(responsePenyesuaianDetail.data);
                setIdPenyesuaian(detail.id_penyesuaian);
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

    const handleBack = async () => {
        try{
            await axios.delete(`http://localhost:5001/penyesuaian_detail/delete_penyesuaian/${idPenyesuaian}`);
            await axios.delete(`http://localhost:5001/penyesuaian_header/delete/${idPenyesuaian}`);
            await props.history.goBack();
        }catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:5001/penyesuaian_detail/delete/${idPenyesuaian}/${e.id_barang}`);
            setRefresh(!refresh);
            alert('Barang berhasil di hapus');
        }catch(error){
            console.log(error);
        }
    }

    const handleSave = async () => {
        try{
            if(tanggalPenyesuaian != ''){
                const data = {
                    tanggal_penyesuaian : tanggalPenyesuaian
                }
                await axios.put(`http://localhost:5001/penyesuaian_header/update/${idPenyesuaian}`,data);

                for(var a = 0; a < dataPenyesuaianDetail.length; a++){
                    const dataBarang = {
                        stok : dataPenyesuaianDetail[a].jumlah_fisik
                    }
                    await axios.put(`http://localhost:5001/barang_detail/update/${dataPenyesuaianDetail[a].id_barang}`,dataBarang);
                }

                await props.history.goBack();
                alert('Data penyesuaian barang berhasil ditambahkan');
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-4 pb-3 border-bottom">
                <button className="col-1 btn btn-outline-secondary" onClick = {handleBack}>Kembali</button>
                <div className="col-5 mx-auto">
                    <h2>Tambah Penyesuaian</h2>
                </div>
            </div>

            {/* List */}
            <div className="row">
                <div className="col-9 row">
                    <div class="form-floating mb-3 px-0 col-2 mx-1">
                        <input type="text" class="form-control" id="floatingInput" value={idPenyesuaian} disabled/>
                        <label for="floatingInput">ID Penyesuaian</label>
                    </div>
                    <div class="form-floating mb-3 px-0 col-2 mx-1">
                        <input type="text" class="form-control" id="floatingInput" value={dataPenyesuaianDetail.length} disabled/>
                        <label for="floatingInput">Jumlah Barang</label>
                    </div>

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

                    <button className="btn btn-success w-100" onClick={handleSave} disabled={tanggalPenyesuaian == '' || dataPenyesuaianDetail.length < 1 ? true : false}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index