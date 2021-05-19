import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { formatMoney } from '../../../global/function'

const Index = (props) => {
    let history = useHistory();

    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [refresh,setRefresh] = useState(false);

    const [search,setSearch] = useState(false);
    const [idSupplier,setIdSupplier] = useState('');
    const [supplier,setSupplier] = useState([]);

    // Variable temp untuk pembayaran hutang
    const [tempPembelian,setTempPembelian] = useState([]);
    const [tempTotal,setTempTotal] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await axios.get('http://localhost:5001/pembayaran_hutang_header/show_all_hutang');
                const responseSupplier = await axios.get('http://localhost:5001/supplier/show_all');
                setSupplier(responseSupplier.data);
                setData(response.data);

            }catch(error){
                setError(true);
            }
        }
        loadData();

        return () => {
        }
    }, [refresh]);

    const viewSupplier = supplier ? supplier.map((list,index) => {
        return (
            <option value = {list.id_supplier} key = {index}>{list.nama_supplier}</option>
        )
    }) : null;

    const viewData = data && search ? data.map((list,index) => {
         return (
            <tr key={index}>
                <td className="p-3" >{list.id_pembelian}</td>
                <td className="p-3" >{list.tanggal_pembelian}</td>
                <td className="p-3" >{list.tanggal_jatuh_tempo}</td>
                <td className="p-3" >Rp. {formatMoney(list.grand_total)}</td>
                <td className="p-3 text-center">
                    <input class="form-check-input" type="checkbox" value={list.id_pembelian} onChange = {(e) => handleTempPembelian(e,list)}/>
                </td>
            </tr>
        )
    }) : null;

    const handleSearch = async () => {
        if(idSupplier){
            const response = await axios.get(`http://localhost:5001/pembayaran_hutang_header/show_all_hutang_supplier/${idSupplier}`);
            setSearch(true);
            setData(response.data);
        }else{
            setSearch(false);
        }
    }

    const handleTempPembelian = (e,list) => {
        if(e.target.checked){
            setTempPembelian([...tempPembelian,list]);
        }else{
            const filter = tempPembelian.filter((item) => {
                return item.id_pembelian !== list.id_pembelian
            })
            setTempPembelian(filter);
        }
    }

    const handleBayar = async () => {
        if(tempPembelian.length > 0 && idSupplier != 0){ // => jika ada data yang dipilih, lanjut ke pembayaran
            const dataHeader = {
                id_supplier : idSupplier,
                total : 0
            }

            tempPembelian.map(list => {
                return dataHeader.total += list.grand_total;
            })

            try{
               const response = await axios.post('http://localhost:5001/pembayaran_hutang_header/register',dataHeader);
               for(var a = 0;a < tempPembelian.length; a++){
                    const dataDetail = {
                        id_pembayaran : response.data.id_pembayaran,
                        id_pembelian : tempPembelian[a].id_pembelian,
                        tanggal_pembelian : tempPembelian[a].tanggal_pembelian,
                        tanggal_jatuh_tempo : tempPembelian[a].tanggal_jatuh_tempo,
                        jumlah : tempPembelian[a].grand_total
                    }
                    const dataPembelianHeader = {
                        pembayaran : 1
                    }
                    await axios.post('http://localhost:5001/pembayaran_hutang_detail/register',dataDetail);
                    await axios.put(`http://localhost:5001/pembelian_header/update/${tempPembelian[a].id_pembelian}`,dataPembelianHeader);
               }
               alert('Silakan lanjutkan ke pembayaran');
               setRefresh(!refresh);
            }catch(error){
                console.log(error);
            }

        }else{
            alert('Tidak ada hutang yang dipilih');
        }
    }
    return (
        <div className="container px-0 pt-5">
            {/* Bagian Atas */}
            <div className="row mb-3">
                <div className="col">
                    <h2>List Hutang Supplier</h2>
                </div>

                <div className="offset-5 col row">
                    <div className="col">
                        <label>Supplier</label>
                        <select class="form-select" onChange={(e) => setIdSupplier(e.target.value)}>
                            <option value = "0">Tidak Ada</option>
                            {viewSupplier}
                        </select>
                    </div>
                    <div className="col mt-4">
                        <button className="btn btn-success mx-1 w-100" onClick={handleSearch}>Cari</button>
                    </div>
                </div>
            </div>
            
            {/* List */}
            <div className="row">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="p-3">ID Pembelian</th>
                            <th className="p-3">Tanggal Pembelian</th>
                            <th className="p-3">Tanggal Jatuh Tempo</th>
                            <th className="p-3">Total</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData}
                        <tr>
                            <th className="p-3">&nbsp;</th>
                            <th className="p-3">&nbsp;</th>
                            <th className="p-3">&nbsp;</th>
                            <th className="p-3">&nbsp;</th>
                            <th className="p-3">
                                <button className="btn btn-success mx-1 w-100" onClick={handleBayar}>Bayar</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index
