import Meowact from "../../../index";

const Title = ({ title }) => <h1>{title}</h1>;

export default class App extends Meowact.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick() {
    console.log("asdasdadasd");
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <Title title={title} />
        <p class="meow">
          Hello <span>world</span>!!
        </p>
        <button onClick={this.onBtnClick}>Button</button>
        <p>
          <a href="https://google.com">Link</a>
        </p>
      </div>
    );
  }
}
