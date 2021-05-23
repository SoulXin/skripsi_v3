import React from 'react'
import moment from 'moment'
import { formatMoney } from '../../../../global/function'

export class Faktur_Retur_Penjualan extends React.PureComponent {
    render() {
        this.state = {
            total : 0,
        }
        this.props.dataTable.map((list,index) => {
            this.state.total += list.total;
        });
    

      return (
        <div style = {{border : '5px solid black'}}>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-6 text-center" style={{textAlign:'center',borderRight : '1px solid black'}}>
                    <h1 className = "pb-2" style = {{borderBottom : '1px solid black'}}>Faktur Retur Penjualan</h1>
                    <img src="/logo.png" alt="image" style = {{width : '100%'}}/>
                    <small>Jalan Ar. Hakim No.8</small><br/>
                    <small>085362023957</small>
                </div>
                <div className="col-6" style = {{borderLeft : '1px solid black'}}>
                    <table>
                        <tr>
                            <td>ID Retur Penjualan</td>
                            <td>{this.props.idRetur} </td>
                        </tr>
                        <tr>
                            <td>ID Penjualan</td>
                            <td>{this.props.idPenjualan} </td>
                        </tr>
                        <tr>
                            <td>Tanggal Retur</td>
                            <td>{this.props.tanggal_retur}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div className="row mx-auto">
                <table className="table_anak">
                <thead style={{borderBottom : '2px solid black'}}>
                    <th>ID Barang</th>
                    <th>Nama</th>
                    <th>Harga Jual</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_barang}</td>
                                    <td>{list.Barang_Header.nama_barang}</td>
                                    <td>Rp. {formatMoney(list.harga_jual)}</td>
                                    <td>{list.jumlah}</td>
                                    <td>Rp. {formatMoney(list.total)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td >&nbsp;</td>
                        <td style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.total)}</td>
                    </tr>
                </table>
            </div>
            
            <div className = "row">
                <div className = "col-3 mt-5 pt-5  text-center mr-auto">
                    <p className="mb-5 pb-2">Tanda Terima,</p>

                    <span style = {{borderBottom : '2px solid black'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <p>Pembeli</p>
                </div>

                <div className = "offset-6 col-3 mt-5 pt-5  text-center ml-auto">
                    <p className="mb-5 pb-2">Hormat Kami,</p>

                    <span style = {{borderBottom : '2px solid black'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <p>Aksara Motor</p>
                </div>
            </div>
        </div>
      );
    }
  }