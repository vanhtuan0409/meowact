import Meowact from "../../../index";

const Title = ({ title }) => <h1>{title}</h1>;

export default class App extends Meowact.Component {
  render() {
    const { title } = this.props;
    return (
      <div>
        <Title title={title} />
        <p>
          Hello <span>world</span>!!
        </p>
      </div>
    );
  }
}
