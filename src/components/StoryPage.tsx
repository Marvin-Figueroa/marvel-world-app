import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { getPaginatedStories } from '../services/stories';
import { RootState } from '../store/store';
import * as actions from '../store/storiesSlice';
import Pagination from './Pagination';
import StoryList from './StoryList';

function StoryPage() {
  const [loadingStories, setLoadingStories] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.stories);

  useEffect(() => {
    getPaginatedStories().then((data) => {
      if (data) {
        dispatch(actions.storiesLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingStories(false);
    });
  }, []);

  useEffect(() => {
    setLoadingStories(true);
    getPaginatedStories(currentPage, 10).then((data) => {
      if (data) {
        dispatch(actions.storiesLoaded(data.results));
        setTotalItems(data.total);
      }
      setLoadingStories(false);
    });
  }, [currentPage]);

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {loadingStories ? (
        <HashLoader color='#dc143c' />
      ) : (
        <StoryList stories={stories} />
      )}

      <Pagination
        totalItems={totalItems}
        pageSize={10}
        onPageChange={handlePageChange}
        siblingCount={1}
        currentPage={currentPage}
      />
    </>
  );
}

export default StoryPage;
