import { returnPaginationRange } from './apputile';
import './pagination.css';
import { Link , useLocation } from 'react-router-dom';




function Pagination(props){
    const location = useLocation();
    let array=returnPaginationRange(props.totalPage,props.page,props.limit,props.siblings)
    let nextPage;
        if (props.page + 1 <= props.totalPage) {
                nextPage = props.page + 1;
            } else {
        nextPage = props.totalPage;
                }

    let previousPage;
        if (props.page > 1) {
            previousPage = props.page - 1;
                    } else {
            previousPage = 1;
                        }
    
    return(<div className='nav' >
        <Link to={`/recipe/page${1}`} className="PageItem" onClick={()=>props.onPageChange("&laquo;")}>&laquo;</Link>
        <Link to={`/recipe/page${previousPage}`}  className="PageItem" onClick={()=>props.onPageChange("&lsaquo;")} >&lsaquo;</Link>
        {array.map(value => {
            let pt
            if (value ===" ..." || value ==="..."){
                 pt=props.totalPage;
            }
            else {if (value ==="... "){
                pt=1;
            }
            else{
                pt=value;
            }}
            if(value === props.page){
                
               return(<div key={value} className="PageItem" onClick={()=>props.onPageChange(value)}  >{value}</div>);}
            else {
                
                return(<Link to={`/recipe/page${pt}`} key={value} className="PageItem" onClick={()=>props.onPageChange(value)}>{value}</Link>);
                
            }
        })}
         <Link to={`/recipe/page${nextPage}`} onClick={()=>props.onPageChange("&rsaquo;")} className="PageItem">&rsaquo;</Link>

        
        <Link to={`/recipe/page${props.totalPage}`} onClick={()=>props.onPageChange("&raquo;")} className="PageItem">&raquo;</Link>

    </div>);
}

export default Pagination; 

