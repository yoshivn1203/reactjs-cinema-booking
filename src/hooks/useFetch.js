import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loading, finishLoading } from '../features/uiSlice';

const useFetch = (service, params = null) => {
  const [state, setState] = useState();
  const dispatch = useDispatch();

  const sendRequest = useCallback(async () => {
    try {
      dispatch(loading());
      const result = await service(params);
      setState(result.data.content);
      dispatch(finishLoading());
    } catch (error) {
      console.log(error);
    }
  }, [service, dispatch, params]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  return { state };
};

export default useFetch;
