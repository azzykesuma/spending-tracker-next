import { useEffect } from 'react';

const DataList = ({data,getData}) => {
    console.log(data);
    useEffect(() => {
        getData();
    })
    return ('data');
}
 
export default DataList;