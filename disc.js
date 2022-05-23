class Disc {
    constructor(center_x, center_y, radius) {
        this.o_x = center_x;
        this.o_y = center_y;
        this.r = radius;
    }
    line(x1, y1, x2, y2, k) {
        let d1 = Math.ceil(dist(this.o_x, this.o_y, x1, y1));
        let d2 = Math.ceil(dist(this.o_x, this.o_y, x2, y2));

        if (d1 < this.r && d2 < this.r) {
            if (d1 > 20 && d2 > 20) {
                this.case3(x1, y1, x2, y2, k);
            }
        } 

    }
    case1(x1, y1, x2, y2, k) {
        noFill();
        colorMode(HSB, wire_frame.length, 1, 1);
        stroke(k, 1, 1);
        strokeWeight(0.8);

        let L1 = new Line(this.o_x, this.o_y, x1, y1);
        let L2 = new Line(this.o_x, this.o_y, x2, y2);

        let L1_tan_points = L1.get_tangent_points();
        let L2_tan_points = L2.get_tangent_points();

        let L1_tan = new Line(L1_tan_points[0], L1_tan_points[1], L1_tan_points[2], L1_tan_points[3]);
        let L2_tan = new Line(L2_tan_points[0], L2_tan_points[1], L2_tan_points[2], L2_tan_points[3]);

        let inter = L2_tan.get_intersection(L1_tan);
        let a = inter[0];
        let b = inter[1];
        let r = dist(a, b, x1, y1);

        let theta_range = this.get_theta_range(x1, y1, x2, y2, a, b);

        arc(a, b, 2*r, 2*r, theta_range[0], theta_range[1]);
    }
    case2(x1, y1, x2, y2) {
        console.log(dist(this.o_x, this.o_y, x1, y1), dist(this.o_x, this.o_y, x2, y2), this.r);
    }
    case3(x1, y1, x2, y2, k) {
        noFill();
        colorMode(HSB, wire_frame.length, 1, 1);
        stroke(k, 1, 1);
        strokeWeight(0.8);

        let L1 = new Line(this.o_x, this.o_y, x1, y1);
        let L2 = new Line(this.o_x, this.o_y, x2, y2);

        let perp_intrs1 = L1.get_circle_intersection(this.r);

        // the lines whose tangents are the tangents to the intersections L1's perp had with disk
        let L11 = new Line(this.o_x, this.o_y, perp_intrs1[0], perp_intrs1[1]);
        let L12 = new Line(this.o_x, this.o_y, perp_intrs1[2], perp_intrs1[3]);
        let L11_tan_points = L11.get_tangent_points();
        let L12_tan_points = L12.get_tangent_points();

        // actual line objects from the tangents above
        let L11T = new Line(L11_tan_points[0], L11_tan_points[1], L11_tan_points[2], L11_tan_points[3]);
        let L12T = new Line(L12_tan_points[0], L12_tan_points[1], L12_tan_points[2], L12_tan_points[3]);

        let C = L11T.get_intersection(L12T);

        let AC = new Line(x1, y1, C[0], C[1]);
        let AB = new Line(x1, y1, x2, y2);

        let AC_bisect_points = AC.get_bisect_points();
        let AB_bisect_points = AB.get_bisect_points();

        let AC_B = new Line(AC_bisect_points[0], AC_bisect_points[1], AC_bisect_points[2], AC_bisect_points[3]);
        let AB_B = new Line(AB_bisect_points[0], AB_bisect_points[1], AB_bisect_points[2], AB_bisect_points[3]);

        let Q = AC_B.get_intersection(AB_B);
        let r = dist(x1, y1, Q[0], Q[1]);

        let theta_range = this.get_theta_range(x1, y1, x2, y2, Q[0], Q[1]);

        arc(Q[0], Q[1], 2*r, 2*r, theta_range[0], theta_range[1]);
    }
    get_theta_range(x1, y1, x2, y2, a, b) {
        //return [0, 2*Math.PI];
        let theta1 = Math.atan2(y1-b, x1-a);
        let theta2 = Math.atan2(y2-b, x2-a);

        theta1 = (theta1+2*Math.PI) % (2*Math.PI);
        theta2 = (theta2+2*Math.PI) % (2*Math.PI);

        if (theta1 <= theta2) {
            if (theta2-theta1 <= Math.PI) {
                return [theta1, theta2];
            } else {
                return [theta2, theta1];
            }
        } else {
            if (theta1-theta2 <= Math.PI) {
                return [theta2, theta1];
            } else {
                return [theta1, theta2];
            }
        }
    }
    show_disc() {
        colorMode(RGB, 255, 255, 255);
        strokeWeight(0.5)
        stroke(255);
        noFill();
        ellipse(this.o_x, this.o_y, 2*this.r);
        fill(255);
        ellipse(this.o_x, this.o_y, 5);
    }
}
