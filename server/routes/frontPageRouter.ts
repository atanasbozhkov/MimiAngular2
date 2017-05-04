import {Router} from "express";
import * as path from "path";
/**
 * Created by atanasbozhkov on 04/05/2017.
 */
export const frontPageRouter: Router = Router();
//TODO: Extract client index.html into projectPath/indexPage variables.
//Contact
frontPageRouter.get('/Contact', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
//Gallery

frontPageRouter.get('/Gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
//Music

frontPageRouter.get('/Music', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
//About
frontPageRouter.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
//Live
frontPageRouter.get('/Live', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../client/index.html'));
});
