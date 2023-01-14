# Hyberbolic Projection of Human Wire Frame

So I first took a video of myself walking around, then ran a python body tracking program on it to get the vertices of my body and make a frame-by-frame video of the positions of those vertices(also had to find how to collect the connections of the vertex graph from the python data structure which holds that info). This program plays an animation of those vertices walking around while a geometric transformation of it around the inside of a Poincare disk displays on the screen around the mouse location. Below is a screenshot of what it looks like. 

Wireframe.js contains the collection of lists of body joint positions for each frame in the animation.

Connections.js contains all of the connections between the joints in the human wire frame. 

line.js and disc.js contain classes which handle the drawing of the lines of the wireframe, and of the hyperbolic transformation of the wireframe.

![main](/Screenshots/poincare_disk.png)
# Hyberbolic Projection of Human Wire Frame

