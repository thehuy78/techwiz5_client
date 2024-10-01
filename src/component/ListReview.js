import React, { useEffect, useState, useMemo } from 'react';
import { formatDate } from "../function/FormatDate";
import Star from './Star';
import "../style/ListReview.scss";
import Infomation from "./Infomation";

export default function ListReview({ review }) {
  const [reviews, setReviews] = useState([]);
  const [choice, setChoice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewPerPage = 4;

  useEffect(() => {
    setReviews(review);
  }, [review]);

  const calculateAverage = (array) => {
    const sum = array.reduce((total, item) => total + item.score, 0);
    return sum / array.length;
  };

  const totalReviewByStar = (review, number) => {
    const list = review.filter((review) => review.score === number);
    return list.length;
  };

  const averageScore = useMemo(() => {
    return reviews.length > 0 ? calculateAverage(reviews).toFixed(1) : "0.0";
  }, [reviews]);

  const totalPages = Math.ceil(reviews.length / reviewPerPage);

  const handleFilterStar = (number) => {
    setChoice(prevChoice => (prevChoice === number ? 0 : number));
  };

  const currentReview = useMemo(() => {
    const filteredReviews = choice === 0 ? reviews : reviews.filter(r => r.score === choice);
    const indexOfLastReview = currentPage * reviewPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewPerPage;
    return filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  }, [currentPage, reviews, choice]);

  const renderPagination = () => {
    const pagination = [];
    const maxVisibleButtons = 7;
    const leftOffset = Math.max(1, currentPage - 2);
    const rightOffset = Math.min(totalPages, currentPage + 2);

    const addPageButton = (page) => {
      pagination.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "active button_pagination_active" : ""}
        >
          {page}
        </button>
      );
    };

    if (totalPages <= maxVisibleButtons) {
      for (let page = 1; page <= totalPages; page++) {
        addPageButton(page);
      }
    } else {
      if (currentPage > 3) {
        addPageButton(1);
        pagination.push(<span key="ellipsis1">...</span>);
      }

      for (let page = leftOffset; page <= rightOffset; page++) {
        addPageButton(page);
      }

      if (currentPage < totalPages - 2) {
        pagination.push(<span key="ellipsis2">...</span>);
        addPageButton(totalPages);
      }
    }

    return pagination;
  };

  const renderReviews = () => {
    return currentReview.length > 0 ? (
      currentReview.map((item, index) => (
        <div className='item_review' key={index}>
          <div className='b____1'>
            <p>{item.first_name} {item.last_name}</p>
            <p><Star number={item.score} /></p>
          </div>
          <p className='date____'>{formatDate(item.create_at)}</p>
          <div><Infomation item={item.comment} /></div>
        </div>
      ))
    ) : (
      <p className='notfound'>Not found</p>
    );
  };

  return (
    <div className='review_product_CO'>
      <div className='filter_container'>
        <div className='total'>
          <p className='total_star_product'>{averageScore}/5.0</p>
          <Star number={averageScore} />
          <p className='total_review'>There are {review.length} reviews</p>
        </div>
        <div className='list_button_filter'>
          {[5, 4, 3, 2, 1].map(star => (
            <button
              key={star}
              className={choice === star ? "button_choice" : ""}
              onClick={() => handleFilterStar(star)}
            >
              {star} Star <span>({totalReviewByStar(review, star)})</span>
            </button>
          ))}
        </div>
      </div>
      <div className='listReview'>
        {renderReviews()}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        {renderPagination()}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
