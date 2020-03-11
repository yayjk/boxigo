/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import convertTime from "convert-time";

export default function Collapsible(props) {
  const capitalize = string => {
    let ret = string.charAt(0).toUpperCase() + string.slice(1);
    ret = ret.replace(/_/g, "-");
    return ret;
  };
  const monthName = dt => {
    const names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    return names[dt.getMonth()];
  };

  const expand = () => {
    var details = document.getElementById("details" + props.id);
    var card = document.getElementById("card" + props.id);
    var expand = document.getElementById("expand" + props.id);
    document.getElementById("statusText" + props.id).innerHTML = "View Quote";
    details.style.display = "grid";
    expand.style.display = "none";
    card.scrollIntoView();
  };

  const collapse = () => {
    var card = document.getElementById("card" + props.id);
    var expand = document.getElementById("expand" + props.id);
    document.getElementById("statusText" + props.id).innerHTML =
      props.custom_status !== null ? props.custom_status : "In transit";
    expand.style.display = "block";
    document.getElementById("details" + props.id).style.display = "none";
    card.scrollIntoView();
  };

  const date = new Date(props.date_created.slice(0, 10));
  const time = props.date_created.slice(11, 16);
  var moving_from = props.moving_from.split(",");
  var moving_to = props.moving_to.split(",");
  const living = Object.entries(props.items.rooms.living_room);
  const bed = Object.entries(props.items.rooms.bed_room);
  const kitchen = Object.entries(props.items.rooms.kitchen);
  const others = Object.entries(props.items.rooms.others);
  const mfjsx = [];
  const mtjsx = [];
  const ljsx = [];
  const bjsx = [];
  const kjsx = [];
  const ojsx = [];

  moving_from.slice(0, 2).forEach(ele => mfjsx.push(<div>{ele}</div>));
  moving_to.slice(0, 2).forEach(ele => mtjsx.push(<div>{ele}</div>));

  living.forEach(ele =>
    ljsx.push(
      <div>
        <p>{ele[1]}</p>
        <p>{capitalize(ele[0])}</p>
      </div>
    )
  );
  bed.forEach(ele =>
    bjsx.push(
      <div>
        <p>{ele[1]}</p>
        <p>{capitalize(ele[0])}</p>
      </div>
    )
  );
  kitchen.forEach(ele =>
    kjsx.push(
      <div>
        <p>{ele[1]}</p>
        <p>{capitalize(ele[0])}</p>
      </div>
    )
  );
  others.forEach(ele =>
    ojsx.push(
      <div>
        <p>{ele[1]}</p>
        <p>{capitalize(ele[0])}</p>
      </div>
    )
  );

  return (
    <div>
      <div className="card" id={"card" + props.id}>
        <header>
          <a href="./">{props.estimate_id}</a>
        </header>
        <section>
          <div id="house">
            <i class="fas fa-warehouse fa-3x"></i>
            <div style={{ paddingLeft: "8px" }}>
              <div>House</div>
              <div>{props.property_size}</div>
            </div>
          </div>
          <div id="summary">
            <div id="summary-start">{mfjsx}</div>
            <div id="summary-mid">
              {props.moving_on}
              <img src="./arrow.png" alt="move" height="50" />
              <button onClick={expand} id={"expand" + props.id}>
                View Move Details
              </button>
            </div>
            <div id="summary-end">{mtjsx}</div>
          </div>
          <div id="status">
            <b id={"statusText" + props.id}>
              {props.custom_status !== null
                ? props.custom_status
                : "In transit"}
            </b>
          </div>
        </section>
        <footer>
          {"Order Date: " +
            monthName(date) +
            " " +
            date.getDate() +
            " " +
            convertTime(time)}
        </footer>
      </div>
      <div
        id={"details" + props.id}
        className="details"
        style={{ display: "none" }}
      >
        <header>
          Item details{" "}
          <span>
            <a href="#">Edit</a>
          </span>
        </header>
        <section>
          <div className="roomtype" id="living">
            <header>Living</header>
            <div>{ljsx}</div>
          </div>
          <div className="roomtype" id="bed">
            <header>Bed</header>
            <div>{bjsx}</div>
          </div>
          <div className="roomtype" id="kitchen">
            <header>Kitchen</header>
            <div>{kjsx}</div>
          </div>
          <div className="roomtype" id="other">
            <header>Others</header>
            <div>{ojsx}</div>
          </div>
        </section>
        <footer>
          <div>
            <div className="customFTH">Details of Old house</div>
            <div>{"Floor No: " + props.old_floor_no}</div>
            <div>
              Elevator{" "}
              <span className="highlightDetail">
                {props.old_elevator_availability}
              </span>
            </div>
            <div>
              Packing{" "}
              <span className="highlightDetail">{props.packing_service}</span>
            </div>
            <div>
              Parking Distance{" "}
              <span className="highlightDetail">
                {props.old_parking_distance}
              </span>
              <span className="highlightDetail">Meters</span>
            </div>
          </div>
          <div>
            <div className="customFTH">Details of New house</div>
            <div>{"Floor No: " + props.new_floor_no}</div>
            <div>
              Elevator{" "}
              <span className="highlightDetail">
                {props.new_elevator_availability}
              </span>
            </div>
            <div>
              Unpacking{" "}
              <span className="highlightDetail">{props.unpacking_service}</span>
            </div>
            <div>
              Parking Distance{" "}
              <span className="highlightDetail">
                {props.new_parking_distance}
              </span>
              <span className="highlightDetail">Meters</span>
            </div>
          </div>
          <div id="collapseWrap">
            <button onClick={collapse} id={"collapse" + props.id}>
              Collapse
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
