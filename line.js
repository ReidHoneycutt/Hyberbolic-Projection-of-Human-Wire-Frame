class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2; 

        this.m;
        this.b;

        this.perp_slope;
        this.bisect_intersept;
        this.tangent_intercept;
        this.segment_length;

        this.set_slope();
        this.set_intercept();
        this.set_perp_slope();
        this.set_bisect_intercept();
        this.set_tangent_intercept();
    }
    set_slope() {
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1); 
    }
    set_intercept() {
        this.b = this.y2 - this.m*this.x2;
    }
    set_perp_slope() {
        this.perp_slope = -1 / this.m;
    }
    set_bisect_intercept() {
        let x = (this.x1 + this.x2) / 2;
        let y = (this.y1 + this.y2) / 2;

        this.bisect_intersept = y - this.perp_slope*x;
    }
    set_tangent_intercept() {
        this.tangent_intercept = this.y2 - this.perp_slope*this.x2;
    }
    get_segment_length() {
        return dist(this.x1, this.y1, this.x2, this.y2);
    }
    get_bisect_points() {
        let x1 = -2*W;
        let y1 = this.perp_slope*x1 + this.bisect_intersept;
        let x2 = 2*W;
        let y2 = this.perp_slope*x2 + this.bisect_intersept;

        return [x1, y1, x2, y2];
    }
    get_tangent_points() {
        let x1 = -2*W;
        let y1 = this.perp_slope*x1 + this.tangent_intercept;
        let x2 = 2*W;
        let y2 = this.perp_slope*x2 + this.tangent_intercept;

        return [x1, y1, x2, y2];
    }
    get_intersection(l) {
        let x = (this.b - l.b) / (l.m - this.m);
        let y = this.m*x + this.b;
        return [x, y];
    }
    get_circle_intersection(r) {
        // this function sucks. written for very specific part in case3
        let angle = Math.atan2(this.y2-this.y1, this.x2-this.x1);
        let theta = Math.acos(this.get_segment_length()/r);

        let x1 = r*Math.cos(angle+theta)+this.x1;
        let y1 = r*Math.sin(angle+theta)+this.y1;
        let x2 = r*Math.cos(angle-theta)+this.x1;
        let y2 = r*Math.sin(angle-theta)+this.y1;

        return [x1, y1, x2, y2];
    }
    show_segment() {
        //stroke(255);
        line(this.x1, this.y1, this.x2, this.y2);
    }
    show_ray() {
        let x2;
        //stroke(255);
        if (this.x1 <= this.x2) {
            x2 = 2*W;
        } else {
            x2 = -2*W;
        }
        y2 = this.m*x2+this.b;
        line(this.x1, this.y1, x2, y2);
    }
    show_line() {
        //stroke(255);
        let x1 = 2*W;
        let y1 = this.m*x1+this.b;
        let x2 = -2*W;
        let y2 = this.m*x2+this.b;
        line(x1, y1, x2, y2);
    }
    show_bisect() {
        let x1 = -2*W;
        let y1 = this.perp_slope*x1 + this.bisect_intersept;
        let x2 = 2*W;
        let y2 = this.perp_slope*x2 + this.bisect_intersept;

        //stroke(255);
        line(x1, y1, x2, y2);
    }
    show_tangent() {
        let x1 = -2*W;
        let y1 = this.perp_slope*x1 + this.tangent_intercept;
        let x2 = 2*W;
        let y2 = this.perp_slope*x2 + this.tangent_intercept;

        //stroke(255);
        line(x1, y1, x2, y2);
    }
}