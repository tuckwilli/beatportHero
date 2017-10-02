# Installing

* Run "npm install" in the root directory.
* Run "npm run build" to start the webpack watch process if desired
* Run "npm run proxy" to start the CORS proxy
* The express server will be on localhost:3000

# Overview

My main goal when building this out was to keep the pagination container flexible enough to be used on all of the other paginated lists on the site with only minor style changes. As such the container is fairly separate from the content. I tested this out by putting some quick image links in the the DJ Charts FPO, and it was pretty straightforward to get pagination functioning there as well. The container supports slides of any height, but assumes all slides in a set will be the same height.

The specific track data is loaded in two steps. The first track's information is loaded immediately, and the rest is loaded once the component is mounted. The tracks are defined by a hardcoded array of track ID's in src/views/index.js, assuming the CMS will provide that information somewhere in the real thing. Tracks are sorted by the order of the array as they are loaded, and the carousel starts autoscrolling once all of the tracks are loaded.
