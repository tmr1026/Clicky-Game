import React, { Component } from 'react';
import Wrapper from './components/Wrapper';
import Title from './components/Title';
import FriendCard from './components/FriendCard';
import friends from './friends.json';
import Score from './components/Score';
import './App.css';

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    guesses: "",
    clicked: [],
  };


  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: 0,
      guesses: "You guessed incorrectly!",
      clicked: [],
    });
    this.handleShuffle();
  }

  handleClick = id => {
    if (this.state.clicked.length === 0) {
      this.handleReset()
    }
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      guesses: "You guessed correctly!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 9) {
      this.setState({ guesses: "You win!" });
    }
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Title>
        Clicky Game!
        </Title>
        <Score>
        Score= {this.state.currentScore}||
        TopScore= {this.state.topScore}||
        Guesses= {this.state.Guesses}
        </Score>

            {this.state.friends.map(friend => (
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
            ))}
      </Wrapper>
    );
  }
}
export default App;

  
