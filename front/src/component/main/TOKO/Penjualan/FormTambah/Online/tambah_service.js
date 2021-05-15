import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // detail pesanan sebelumnya (diambil dari parameter)
    const [detail,setDetail] = useState();
    
    // Data service
    const [dataService,setDataService] = useState();

    // Waktu
    const [waktu,setWaktu] = useState('');
    const [disableWaktu,setDisableWaktu] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseService = await axios.get('http://localhost:5001/jenis_service/show_all');
                const response = await axios.get(`http://localhost:5001/pesanan_pelanggan_header/show_detail/${detail.id_pesanan_pelanggan}`);
                setData(responseService.data);
                setDetail(response.data);
                setDataService(response.data.Pesanan_Pelanggan_Booking_Service);
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
                <td className="p-3">{list.nama}</td>
                <td className="p-3">Rp. {formatMoney(list.harga)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const viewWaktu = props.location.state.Pesanan_Pelanggan_Booking_Service.length > 0 ? 
    <div class="offset-5 col-2 px-0 form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={props.location.state.Pesanan_Pelanggan_Booking_Service[0].waktu} disabled/>
        <label for="floatingInput">Waktu</label>
    </div>
    : 
    <div class="offset-5 col-2 form-floating mb-3 px-0">
        <select class="form-select" aria-label="Default select example" onChange = {(e => setWaktu(e.target.value))} disabled = {disableWaktu}>
            <option value="" selected>Tidak Ada</option>
            <option value="9 Pagi - 10 Pagi">9 Pagi - 10 Pagi</option>
            <option value="12 Siang - 1 Siang">12 Siang - 1 Siang</option>
            <option value="2 Siang - 3 Siang">2 Siang - 3 Siang</option>
            <option value="4 Sore - 5 Sore">4 Sore - 5 Sore</option>
        </select>
        <label>Waktu</label>
    </div>

    const handleAdd = async (e) => {
        const filter = dataService.filter((list) => list.id_service !== e.id_service);
        if(filter.length || dataService == 0){ // => jika data filter memberikan return service tersebut, berarti service yg direturn tersebut blm ada di pesanan
            if(waktu){ // => jika waktu terisi
                try{
                    const data = {
                        id_pesanan_pelanggan : detail.id_pesanan_pelanggan,
                        id_service : e.id_service,
                        waktu : waktu ? waktu : dataService[0].waktu,
                        no_antrian : dataService > 0 ? dataService[0].no_antrian : detail.id_pesanan_pelanggan
                    }
                    await axios.post('http://localhost:5001/pesanan_pelanggan_booking_service/register',data);
                    setDisableWaktu(!disableWaktu);
                    alert('Service berhasil di tambahkan');
                }catch(err){
                    console.log(err);
                }
            }else{
                alert('Pilih waktu service terlebih dahulu');
            }
        }else{ // => sudah ada dipesanan
            alert('Service ini sudah ada')
        }
        setRefresh(!refresh);
    }

    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col-5 row">
                    <button className = "col-2 mb-3 row btn btn-outline-secondary" onClick = {props.history.goBack}>Kembali</button>
                    <h2 className="col-12">Daftar Service Yang Tersedia</h2>
                    <i>Penambahan Service Untuk Pesanan - {detail ? <b> {detail.id_pesanan_pelanggan} / {detail.Pelanggan.nama_pelanggan} </b> : null}</i>
                </div>
                {viewWaktu}
             </div>

            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Harga</th>
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