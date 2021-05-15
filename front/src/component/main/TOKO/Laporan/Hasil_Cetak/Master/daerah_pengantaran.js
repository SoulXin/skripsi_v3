import React from 'react'
import { formatMoney } from '../../../../../global/function';

export class Cetak_Daerah_Pengantaran extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Daerah Pengantaran</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
                <table className="">
                <thead>
                    <th>ID Daerah Pengantaran</th>
                    <th>Nama Kecamatan</th>
                    <th>Biaya Pengantaran</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_daerah_pengantaran}</td>
                                    <td>{list.kecamatan}</td>
                                    <td>Rp. {formatMoney(list.harga)}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
      );
    }
  }