import React from 'react'
import { formatMoney } from '../../../../global/function'

export class Faktur_Retur_Penjualan extends React.PureComponent {
    render() {
        this.state = {
            total : 0,
        }
        this.props.dataTable.map((list,index) => {
            this.state.total += list.Barang_Header.harga_beli * list.jumlah;
        });
    

      return (
        <div style = {{border : '5px solid black'}}>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-6 text-center" style={{textAlign:'center',borderRight : '1px solid black'}}>
                    <h1 className = "pb-2" style = {{borderBottom : '1px solid black'}}>Faktur Pesanan Pembelian</h1>
                    <img src="/logo.png" alt="image" style = {{width : '100%'}}/>
                    <small>Jalan Ar. Hakim No.8</small><br/>
                    <small>085362023957</small>
                </div>
                <div className="col-6" style = {{borderLeft : '1px solid black'}}>
                    <table>
                        <tr>
                            <td>ID Pesanan Pembelian</td>
                            <td>{this.props.id_pesanan_pembelian} </td>
                        </tr>
                        <tr>
                            <td>Tanggal Pemesanan</td>
                            <td>{this.props.tanggal_pemesanan}</td>
                        </tr>
                        <tr>
                            <td>Nama Supplier</td>
                            <td>{this.props.nama_supplier}</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div className="row mx-auto">
                <table className="table_anak">
                <thead style={{borderBottom : '2px solid black'}}>
                    <th>ID Barang</th>
                    <th>Nama</th>
                    <th>Merek</th>
                    <th>Harga Beli</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.Barang_Header.id_barang}</td>
                                    <td>{list.Barang_Header.nama_barang}</td>
                                    <td>{list.Barang_Header.merek_barang}</td>
                                    <td>{list.Barang_Header.harga_beli}</td>
                                    <td>{list.jumlah}</td>
                                    <td>{ formatMoney(list.Barang_Header.harga_beli * list.jumlah) }</td>
                                </tr>
                            )
                        })
                    }
                    <tr style={{borderTop : '2px solid black',background : 'white'}}>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td >&nbsp;</td>
                        <td >&nbsp;</td>
                        <td style = {{borderBottom : '2px solid black'}}>Grand Total : </td>
                        <td style = {{borderBottom : '2px solid black'}}>Rp. {formatMoney(this.state.total)}</td>
                    </tr>
                </table>
            </div>
        </div>
      );
    }
  }