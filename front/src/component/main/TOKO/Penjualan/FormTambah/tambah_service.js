import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../../global/function'

const Index = (props) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    // Id Penjualan
    const [idPenjualan,setIdPenjualan] = useState('');

    // detail pesanan sebelumnya (diambil dari parameter)
    const [detail,setDetail] = useState();
    
    // Data service
    const [dataService,setDataService] = useState();

    useEffect(() => {
        const loadData = async () => {
            try{
                const detail = props.location.state;
                const responseService = await axios.get('http://localhost:5001/jenis_service/show_all');
                const response = await axios.get(`http://localhost:5001/penjualan_service/show_detail/${detail}`);
                
                setIdPenjualan(detail);
                setData(responseService.data);
                setDetail(response.data);
                setDataService(response.data);
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
                <td className="p-3">{list.nama_service}</td>
                <td className="p-3">Rp. {formatMoney(list.harga)}</td>
                <td className="p-3" style={{position:'relative'}}>
                    <button className="btn btn-outline-success" style = {{position : 'absolute',bottom : 10,right : 10}} onClick={() => handleAdd(list)}>Tambah</button>
                </td>
            </tr>
        )
    }) : null;

    const handleAdd = async (e) => {
        const filter = dataService.filter((list) => list.id_service === e.id_service && list.id_penjualan === idPenjualan);
        if(!filter.length){ // => jika data filter memberikan return service tersebut, berarti service yg direturn tersebut blm ada di pesanan
            try{
                var jumlah = prompt("Masukan jumlah service"); // => prompt input jumlah
                if(jumlah != '' && jumlah != 0){
                    const data = {
                        id_penjualan : idPenjualan,
                        id_service : e.id_service,
                        harga : e.harga,
                        jumlah : jumlah,
                        total : e.harga * jumlah
                    }
    
                    await axios.post('http://localhost:5001/penjualan_service/register',data);
                    setRefresh(!refresh);
                    alert('Service berhasil di tambahkan');
                }else{
                    alert('Jumlah tidak boleh kosong!');
                }
            }catch(err){
                console.log(err);
            }
        }else{ // => sudah ada dipesanan
            const dataUpdate = {
                jumlah : detail[0].jumlah + 1,
                total : detail[0].total + parseInt (e.harga)
            }
            await axios.put(`http://localhost:5001/penjualan_service/update_service/${idPenjualan}/${e.id_service}`, dataUpdate);
            setRefresh(!refresh);
            alert('Service berhasil di tambahkan');
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
                </div>
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