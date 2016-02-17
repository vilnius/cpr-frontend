import {Component} from 'angular2/core';

@Component({
  selector: 'cameras',
  template: `<h2>Cameras</h2>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>IP</th>
        <th>Last activity</th>
        <th>Logs</th>
      </tr>
    </thead>
    <tr>
      <td>1</td>
      <td>1G</td>
      <td>123.45.67.89</td>
      <td>15 minutes ago</td>
      <td><a href="#">Today</a> | <a href="#">Yesterday</a></td>
    </tr>
  </table>
  `
})
export class Cameras {}

@Component({
  selector: 'videos',
  template: `<h2>Videos</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Camera</th>
        <th>Time</th>
        <th>Location</th>
        <th>Length (s)</th>
        <th>Preview</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tr>
      <td>1</td>
      <td>1G</td>
      <td>2016-02-03 14:55:35</td>
      <td><a href="#">(54.68576, 25.27149)</a></td>
      <td>60</td>
      <td><a href="#"><img height="40"
src="http://www.gdsimage.com/smr/Lukas/images/Lukas-LK-5900HD-DUO/Lukas-LK-5900HD-DUO-16GB-F2.2-Wide-Angle-HD-2Ch-Dash-Cam-Car-Camera-Black-Box-03.jpg"/>
</a></td>
      <td><span class="label label-info">New</span></td>
      <td><a href="#">Approve</a> | <a href="#">Delete</a></td>
    </tr>
  </table>
  `
})
export class Videos {}

@Component({
  selector: 'penalties',
  template: `<h2>Penalties</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Video</th>
        <th>Plate number</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tr>
      <td>1</td>
      <td><a href="#/videos"><img height="40"
src="http://www.gdsimage.com/smr/Lukas/images/Lukas-LK-5900HD-DUO/Lukas-LK-5900HD-DUO-16GB-F2.2-Wide-Angle-HD-2Ch-Dash-Cam-Car-Camera-Black-Box-03.jpg"/>
</a></td>
      <td>ABC123</td>
      <td><span class="label label-default">Closed</span></td>
      <td><a href="#">Send to Delfi.lt</a> | <a href="#">Send to Avilys</a></td>
    </tr>
  </table>
  `
})
export class Penalties {}
