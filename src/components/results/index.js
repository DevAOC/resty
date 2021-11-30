import "./results.scss";
import ReactJson from "react-json-view";

export default function Results(props) {
  return (
    <section>
      <pre data-testid="data">
        {props.data ? (
          <ReactJson src={props.data} theme="summerfruit:inverted" />
        ) : null}
      </pre>
    </section>
  );
}
