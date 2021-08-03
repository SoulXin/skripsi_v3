import React from 'react'
import moment from 'moment'

export class Cetak_Penyesuaian_Stok extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{border : '2px solid black'}}>
                <div className="col-6">
                    <h1 style={{textAlign:'center'}}>Laporan Penyesuaian Barang</h1>
                </div>
                <div className="col-6">
                    <table>
                        <tr>
                            <td>Tanggal Cetak</td>
                            <td>  {moment(this.props.tanggal).utc().format('DD / MMMM / YYYY')} </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="row mx-auto" style={{border : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Penyesuaian</th>
                    <th>Tanggal Penyesuaian</th>
                    <th>Jumlah Fisik</th>
                    <th>Jumlah Sistem</th>
                    <th>Penyesuaian</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            var totalFisik = 0;
                            var totalSistem = 0;
                            var totalPenyesuaian = 0;
                            
                            list.Penyesuaian_Detail.map((list_detail) => {
                                totalFisik += list_detail.jumlah_fisik
                                totalSistem += list_detail.jumlah_sistem
                                totalPenyesuaian += list_detail.penyesuaian
                            });
                            return (
                                <tr key={index}>
                                    <td>{list.id_penyesuaian}</td>
                                    <td>{list.tanggal_penyesuaian}</td>
                                    <td>{totalFisik}</td>
                                    <td>{totalSistem}</td>
                                    <td>{totalPenyesuaian}</td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
            <div className="row mt-5 pt-5">
                <p className="offset-1 col-2 text-center border-top">Di Cetak Oleh</p>
                <p className="offset-6 col-2 text-center  border-top">Di Setujui Oleh</p>
            </div>
        </div>
      );
    }
  }