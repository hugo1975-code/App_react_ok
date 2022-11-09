import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Bisuteria: [
        { id: 0, rating: 4, name: "Pulseras", image: 'imagen01.jpg' },
        { id: 1, rating: 4, name: "Collares", image: "imagen02.jpg" },
        { id: 2, rating: 5, name: "Juego de collar", image: "imagen03.jpg" },
        { id: 3, rating: 5, name: "Cadenas", image: "imagen04.jpg" },
      ],
      copyBisuteria: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  initBisuteria() {
    //this.setState({copyBisuteria: [...this.state.Bisuteria]});
    this.setState((state, props) => ({
      copyBisuteria: [...state.Bisuteria]
    }));
  }

  componentDidMount() {
    this.initBisuteria();
  }

  onSearch(query) {
    if (query === '') {
      this.setState({ copyBisuteria: [...this.state.Bisuteria] });
    } else {

      const temp = [...this.state.Bisuteria];
      var res = [];
      temp.forEach(item => {
        if (item.title.toLowerCase().indexOf(query) > -1) {
          res.push(item);
        }
      });

      this.setState({ copyBisuteria: [...res] });
    }
  }

  addItem(item) {
    var temp = [...this.state.Bisuteria];
    const id = temp[temp.length - 1].id + 1;
    item['id'] = id;
    temp.push(item);
    this.setState({ Bisuteria: [...temp] });
    this.initBisuteria();
  }

  remove(id) {
    var temp = [...this.state.Bisuteria];
    const res = temp.filter(item => item.id != id);
    this.setState({ Bisuteria: [...res] });
    this.initBisuteria();
  }

  updateRating(item) {
    var temp = [...this.state.Bisuteria];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({ Bisuteria: [...temp] });
    this.initBisuteria();
  }

  render() {
    return (
      <div className="app">
        <Menu title="Bisuteria Artesanal" onsearch={this.onSearch} onadd={this.addItem} />
        <List className="list" items={this.state.copyBisuteria} onremove={this.remove} onupdaterating={this.updateRating} />
      </div>
    );
  }
}

export default App;
