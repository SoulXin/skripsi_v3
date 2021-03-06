import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function';

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [idPenjualan,setIdPenjualan] = useState('');
    const [idService,setIdService] = useState('');
    const [namaService,setNamaService] = useState('');
    const [jumlah,setJumlah] = useState('');
    const [hargaSistem,setHargaSistem] = useState('');

    useEffect(() => { 
        const loadData = async () => {
            console.log(props.location.state)
            try{
                setIdPenjualan(props.location.state.detail.id_penjualan);
                setIdService(props.location.state.detail.id_service);
                setNamaService(props.location.state.detail.Jenis_Service.nama_service);
                setHargaSistem(props.location.state.detail.Jenis_Service.harga);
                setJumlah(props.location.state.detail.jumlah);
            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const handleSave = () => {
        const data = {
            jumlah : jumlah,
            total : hargaSistem * jumlah
        }

        if(jumlah){
            axios.put(`http://localhost:5001/penjualan_service/update_service/${idPenjualan}/${idService}`, data)
            .then((res) => {
                alert('Jumlah service berrhasil di ubah');
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            alert('Jumlah tidak boleh kosong');
        }
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col-5 row">
                    <button className = "col-2 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
                    <h1>Perubahan Edit Service</h1>
                    <i>Perubahan Service Untuk Penjualan - {idPenjualan}</i>
                </div>
             </div>

            {/* List */}
            <div className="row col-7 mx-auto mt-5 border rounded">
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={namaService} disabled/>
                        <label for="nama_barang">Nama Service</label>
                    </div>
                </div>

               
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={"Rp. "+formatMoney(hargaSistem)} disabled/>
                        <label for="nama_barang">Harga Sistem</label>
                    </div>
                </div>
                
                <div class="mb-3 col-6 mt-2">
                    <div className="form-floating px-0">
                        <input type="text" class="form-control" id="nama_barang" value={jumlah} onChange = {(e) => setJumlah(e.target.value)}/>
                        <label for="nama_barang">Jumlah</label>
                    </div>
                </div>

                <div class="mb-3 col-6 mt-2">
                     <button className="btn btn-outline-success w-100 mt-2" onClick = {handleSave}>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default Index