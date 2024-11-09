import { returnPaginationRange } from './apputile';
import './pagination.css';
import { Link, useLocation } from 'react-router-dom';

function Pagination(props) {
  const location = useLocation();

  // Get the page range based on the total pages, current page, limit, and siblings
  const array = returnPaginationRange(props.totalPage, props.page, props.limit, props.siblings, props.category);

  // Determine next and previous pages
  const nextPage = props.page + 1 <= props.totalPage ? props.page + 1 : props.totalPage;
  const previousPage = props.page > 1 ? props.page - 1 : 1;

  return (
    <div className="nav">
      {/* First Page (<<) */}
      <Link to={`/recipe/${props.category}/page${1}`} className="PageItem" onClick={() => props.onPageChange("&laquo;")}>
        &laquo;
      </Link>

      {/* Previous Page (<) */}
      <Link to={`/recipe/${props.category}/page${previousPage}`} className="PageItem" onClick={() => props.onPageChange("&lsaquo;")}>
        &lsaquo;
      </Link>

      {/* Page Numbers */}
      {array.map((value) => {
        let pt = value === "..." ? props.totalPage : value === "... " ? 1 : value;

        // Render the current page as a div (not clickable)
        if (value === props.page) {
          return (
            <div key={value} className="PageItem">
              {value}
            </div>
          );
        } else {
          // Render other pages as clickable links
          return (
            <Link to={`/recipe/${props.category}/page${pt}`} key={value} className="PageItem" onClick={() => props.onPageChange(value)}>
              {value}
            </Link>
          );
        }
      })}

      {/* Next Page (>) */}
      <Link to={`/recipe/${props.category}/page${nextPage}`} className="PageItem" onClick={() => props.onPageChange("&rsaquo;")}>
        &rsaquo;
      </Link>

      {/* Last Page (>>) */}
      <Link to={`/recipe/${props.category}/page${props.totalPage}`} className="PageItem" onClick={() => props.onPageChange("&raquo;")}>
        &raquo;
      </Link>
    </div>
  );
}

export default Pagination;
