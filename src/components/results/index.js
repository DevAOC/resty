import "./results.scss";

export default function Results(props) {
  return (
    <section>
      <pre data-testid="data">
        {props.data ? (
          JSON.stringify(props.data, undefined, 2)
        ) : (
          <p>...loading</p>
        )}
      </pre>
    </section>
  );
}
