using System;
using System.Collections.Generic;
using System.Linq;

namespace Models
{
    public class RobotMove : RobotTask
    {
        Graph graph;
        Point point;

        /// <summary>
        /// Method used to set the path the robot has to take using a graph and a point
        /// </summary>
        /// <param name="graph"></param>
        /// <param name="point"></param>
        public RobotMove(Graph graph, Point point)
        {
            this.graph = graph;
            this.point = point;
        }

        /// <summary>
        /// Method used to move the robot over said path
        /// </summary>
        /// <param name="r"></param>
        public void StartTask(Robot r)
        {
            r.MoveOverPath(this.graph, this.point);
        }

        /// <summary>
        /// Method to set the currentpoint to the actual point the robot is standing on to stop it from moving any further 
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public bool TaskComplete(Robot r)
        {
                return this.point == r.currentPoint;
        }
    }
}