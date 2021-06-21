import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { movieApi } from '../../../api/movieApi';
import logo from './logo.png';
import arrow from './arrow.png';
import './movieYearQuiz.css';
import Modal from '../../common/Modal';

function MovieYearQuiz() {
  const [firstMovie, setFirstMovie] = useState(null);
  const [secondMovie, setSecondMovie] = useState(null);
  const [thirdMovie, setThirdMovie] = useState(null);
  const [fourthMovie, setFourthMovie] = useState(null);
  const [fifthMovie, setFifthMovie] = useState(null);
  const [firstAnswer, setFirstAnswer] = useState(null);
  const [secondAnswer, setSecondAnswer] = useState(null);
  const [thirdAnswer, setThirdAnswer] = useState(null);
  const [fourthAnswer, setFourthAnswer] = useState(null);
  const [fifthAnswer, setFifthAnswer] = useState(null);
  const [randomMovies, setRandomMovies] = useState(null);
  const [sortedMovies, setSortedMovies] = useState(null);
  const [score, setScore] = useState(0);
  // modal state: true일 때 modal 출력
  const [showModal, setShowModal] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false);
  /* 1부터 24까지의 랜덤한 자연수 중 중복 없이 5개를 뽑아서 배열에 넣는다. */
  const randomNumbers = [];

  for (let i = 0; i < 5; i += 1) {
    const randomNum = Math.floor(Math.random() * 24);
    if (randomNumbers.indexOf(randomNum) === -1) {
      randomNumbers.push(randomNum);
    } else {
      i -= 1;
    }
  }

  const firstMovieIndex = randomNumbers[0];
  const secondMovieIndex = randomNumbers[1];
  const thirdMovieIndex = randomNumbers[2];
  const fourthMovieIndex = randomNumbers[3];
  const fifthMovieIndex = randomNumbers[4];
  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  useEffect(() => {
    /* 영화 데이터를 불러온다. */
    console.log(randomNumbers);
    const getData = async () => {
      const { data } = await movieApi.popular(makeRandomNumber(24));
      setFirstMovie(`https://image.tmdb.org/t/p/original${data.results[firstMovieIndex].poster_path}`);
      setSecondMovie(`https://image.tmdb.org/t/p/original${data.results[secondMovieIndex].poster_path}`);
      setThirdMovie(`https://image.tmdb.org/t/p/original${data.results[thirdMovieIndex].poster_path}`);
      setFourthMovie(`https://image.tmdb.org/t/p/original${data.results[fourthMovieIndex].poster_path}`);
      setFifthMovie(`https://image.tmdb.org/t/p/original${data.results[fifthMovieIndex].poster_path}`);
      const randomMovies = [];
      /* 랜덤하게 뽑은 다섯 영화를 배열에 넣는다. */
      randomMovies.push(randomNumbers.slice(0, 5).map((number) => data.results[number]));
      console.log(randomMovies);
      setRandomMovies(randomMovies);
      console.log(randomMovies.release_date);
      /* 다섯 영화의 날짜를 비교해서 오름차순으로 정렬하여 새로운 배열에 넣는다. */
      const sortedMovies = randomMovies.sort((a, b) => (
          a.release_date.getTime() - b.release_date.getTime()
      ));
      setSortedMovies(sortedMovies);
      console.log(sortedMovies);
    };
    getData();
  }, [score]);

    /* textfield의 각 숫자를 받아와서 배열에 넣는다. */

    const answerArray = [];
    answerArray.push(firstAnswer);
    answerArray.push(secondAnswer);
    answerArray.push(thirdAnswer);
    answerArray.push(fourthAnswer);
    answerArray.push(fifthAnswer);
    console.log(answerArray);

    /* 첫 번째부터 랜덤 배열의 해당 인덱스 영화와 오름차순 배열의 앞에서부터 영화가 일치하는지 확인한다. */
    const checkAnswer = (e) => {
      for (let i = 0; i < 5; i += 1) {
        let count = 0;
        if (randomMovies[answerArray[i]] !== sortedMovies[i]) {
          setShowModalFail(true);
          setFirstAnswer('');
          setSecondAnswer('');
          setThirdAnswer('');
          setFourthAnswer('');
          setFifthAnswer('');
          break;
        } else {
          count += 1;
        }
          if (count === 5) {
            setScore(score + 1);
            setShowModal(true);
          }
        }
    };

  return (

    <div>
      <Modal showModal={showModal} setshowModal={setShowModal} confirmFunction={() => setShowModal(false)} title="정답입니다!" contents={`현재까지 맞힌 개수: ${score}개`} />
      <Modal showModal={showModalFail} setshowModal={setShowModalFail} confirmFunction={() => setShowModalFail(false)} title="틀렸습니다!" contents={`현재까지 맞힌 개수: ${score}개`} />

      <header>
        <div className="nav_bar">
          <div>
            <img src={logo} alt="logo" id="logo" />
          </div>
          <div className="movieQuiz">영화퀴즈</div>
          <div className="ranking">랭킹</div>
        </div>
        <div className="division_bar_1">
          <div className="division_bar_2"> divbar </div>
        </div>
      </header>
      <body>
        <div className="quiz6">6. 영화 개봉 순서 맞추기</div>
        <div className="question6">다음 영화들을 개봉한 순서대로 나열해보세요.</div>
        <div className="image_box">
          <div className="posters">
            <div className="poster">
              <img src={firstMovie} alt="" className="posterImage" />
              1
            </div>
            <div className="poster">
              <img src={secondMovie} alt="" className="posterImage" />
              2
            </div>
            <div className="poster">
              <img src={thirdMovie} alt="" className="posterImage" />
              3
            </div>
            <div className="poster">
              <img src={fourthMovie} alt="" className="posterImage" />
              4
            </div>
            <div className="poster">
              <img src={fifthMovie} alt="" className="posterImage" />
              5
            </div>

          </div>
        </div>
        <div className="answers">
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" onChange={(e) => setFirstAnswer(parseInt(e.target.value, 10))} type="text" value={firstAnswer} />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" onChange={(e) => setSecondAnswer(parseInt(e.target.value, 10))} type="text" value={secondAnswer} />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" onChange={(e) => setThirdAnswer(parseInt(e.target.value, 10))} type="text" value={thirdAnswer} />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" onChange={(e) => setFourthAnswer(parseInt(e.target.value, 10))} type="text" value={fourthAnswer} />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" onChange={(e) => setFifthAnswer(parseInt(e.target.value, 10))} type="text" value={fifthAnswer} />
          </form>
        </div>

        <div>
          <button className="next_button" onClick={(e) => checkAnswer(e)}>다음 퀴즈</button>
        </div>
      </body>
    </div>
  );
}

export default MovieYearQuiz;
