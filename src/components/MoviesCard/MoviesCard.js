import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <div className="card">
      <div className="card__wrapper">
        <h2 className="card__title">В погоне за Бэнкси</h2>
        <p className="card__time">27 минут</p>
      </div>
      <img className="card__image" src={props.image} alt="Плакат фильма" />
      {props.savedMovies ?
        <button className="card__delete-button" type="button"></button>
        :
        <button
          className={props.isSaved ? 'active-button' : 'card__save-button'}
          type="button"
        >
          {props.isSaved ? '' : 'Сохранить'}
        </button>}

    </div>
  )
}

export default MoviesCard;