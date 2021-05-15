import React from 'react'
import { formatMoney } from '../../../../../global/function';

export class Cetak_Jenis_Service extends React.PureComponent {
    render() {
      return (
        <div>
            <div className="row col-12 mx-auto pt-3 pb-3" style={{borderBottom : '2px solid black'}}>
                <div className="col-12">
                    <h1 style={{textAlign:'center'}}>Data Jenis Service</h1>
                </div>
            </div>
            <div className="row mx-auto" style={{borderBottom : '2px solid black'}}>
                <table className="">
                <thead>
                    <th className="p-3">ID Jenis Service</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Harga</th>
                </thead>
                    {
                        this.props.dataTable.map((list,index) => {
                            return (
                                <tr>
                                    <td>{list.id_service}</td>
                                    <td>{list.nama}</td>
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