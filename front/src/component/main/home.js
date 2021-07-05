import React,{useEffect,useState} from 'react';

const Index = () => {
    const [refresh,setRefresh] = useState(false);
    const [error,setError] = useState('');
    
    useEffect(() => {
        const loadData = async () => {

        }
        loadData();

        return () => {
        }
    }, [refresh]);


    return (
        <div className = "col-10 text-center container-fluid pt-5" style = {{zIndex : 0}}>
            <h1>Selamat Datang</h1>
            <h1>Hai Sayang</h1>
        </div>
    )
}

export default Index