interface IProps {
  width?: string;
  id?:string;
  header?:string;
  sliderBody?:any;
  onClose?: (e: any) => void;
}

function Slider(props: IProps) {
  return (
    <div>
      {/* Offcanvas Component */}
      <div
        className={`offcanvas offcanvas-end w-${props.width}`}
        tabIndex={-1}
        id={props.id}
        aria-labelledby={`${props.id}Label`}
      >
        <div className="offcanvas-header d-flex justify-content-center bg-light border">
          <button
            type="button"
            className="btn-close text-reset position-absolute start-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={(e) => {
              e.preventDefault();
              if (props.onClose) {
                props.onClose(false);
              }
            }}
          ></button>
          <h5
            id={`${props.id}Label`}
            className="d-flex justify-content-center"
          >
            {props.header}
          </h5>
        </div>
        <div className="offcanvas-body">
          {props.sliderBody}
        </div>
      </div>
    </div>
  );
}

export default Slider