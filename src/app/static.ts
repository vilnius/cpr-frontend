import {Component} from 'angular2/core';

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
