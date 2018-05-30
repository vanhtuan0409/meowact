export default class Component {
  constructor(props) {
    this.props = props;
    this.state = null;
  }

  componentDidMount() {}

  render() {
    throw new Error("Component didn't implement render function");
  }
}
