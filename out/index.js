var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./docElements"], function (require, exports, docElements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    docElements_1 = __importDefault(docElements_1);
    alert("hello from file");
    docElements_1.default.curPlayingInfo.innerText = "wassup";
});
