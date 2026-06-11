import { Component, input } from '@angular/core';
import { HardwareModel } from '../../../core/models/hardwareModel';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login{}
