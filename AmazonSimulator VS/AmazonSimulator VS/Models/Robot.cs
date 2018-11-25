using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Robot : Model3D, IUpdatable
    {
        private Point _desiredPoint;
        public Point desiredPoint { get { return _desiredPoint; } }
        private Point _currentPoint;
        public Point currentPoint { get { return _currentPoint; } }
        private List<Point> route = new List<Point>();
        private List<RobotTask> tasks = new List<RobotTask>();
        private Barrels _barrel;
        public Barrels barrel { get { return _barrel; } }

        /// <summary>
        /// Constructor for creating the robot with a position
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="rotationX"></param>
        /// <param name="rotationY"></param>
        /// <param name="rotationZ"></param>
        public Robot(decimal x, decimal y, decimal z, decimal rotationX, decimal rotationY, decimal rotationZ)
        {
            this.type = "robot";
            this.guid = Guid.NewGuid();

            this._x = x;
            this._y = y;
            this._z = z;

            this._rX = rotationX;
            this._rY = rotationY;
            this._rZ = rotationZ;

            this._barrel = null;
        }

        /// <summary>
        /// Constructor for creating the robot with a point
        /// </summary>
        /// <param name="point"></param>
        public Robot(Point point)
        {
            this.type = "robot";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;

            _currentPoint = point;
            this._desiredPoint = _currentPoint;
            route.Add(_currentPoint);

            this._barrel = null;
        }

        /// <summary>
        /// Method used to add a task to the object
        /// </summary>
        /// <param name="task"></param>
        public void AddTask(RobotTask task)
        {
            tasks.Add(task);
        }

        /// <summary>
        /// The main method used to make the robot move over the shortest path
        /// </summary>
        /// <param name="pointGraph"></param>
        /// <param name="point"></param>
        public void MoveOverPath(Graph pointGraph, Point point)
        {
            _desiredPoint = point;
            if (route.Count == 1)
            {
                route = DijkstraClass.Dijkstra(pointGraph, currentPoint, desiredPoint);
            }
            if (IsOnPoint(this, route[1]))
            {
                this.CurrentPoint(route[1]);
                if (route.Count != 1)
                {
                    route.RemoveAt(0);
                }
            }
        }

        /// <summary>
        /// Method for movement of the object
        /// </summary>
        /// <param name="point"></param>
        public void Move(Point point)
        {
            if (this.x < point.x)
            {
                this.Move(this.x + 0.4m, this.y, this.z);
            }
            else if (this.x > point.x)
            {
                this.Move(this.x - 0.4m, this.y, this.z);
            }

            if (this.z < point.z)
            {
                this.Move(this.x, this.y, this.z + 0.5m);
            }
            else if (this.z > point.z)
            {
                this.Move(this.x, this.y, this.z - 0.5m);
            }
        }

        /// <summary>
        /// Method used to check if the robot is on a certain point, returning true or false based on location
        /// </summary>
        /// <param name="robot"></param>
        /// <param name="point"></param>
        /// <returns></returns>
        public bool IsOnPoint(Robot robot, Point point)
        {
            if (robot.x == point.x)
            {
                if (robot.y == point.y)
                {
                    if (robot.z == point.z)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Method used to set the desiredpoint to another point, making the robot go there
        /// </summary>
        /// <param name="point"></param>
        public void AssignPoint(Point point)
        {
            _desiredPoint = point;
            needsUpdate = true;
        }


        /// <summary>
        /// Method used to set the currenpoint to another point
        /// </summary>
        /// <param name="point"></param>
        public void CurrentPoint(Point point)
        {
            _currentPoint = point;
        }

        /// <summary>
        /// Method used to "pick up" the barrel and make it hover above the robot
        /// </summary>
        /// <param name="barrel"></param>
        public void AssignBarrel(Barrels barrel)
        {
            if (barrel.point == this.currentPoint)
            {
                barrel.AssignPoint(null);
                this._barrel = barrel;
                _barrel.Move(this._x, this._y + 1, this._z);
                needsUpdate = true;
            }
        }

        /// <summary>
        /// Method to remove a barrel from a boat
        /// </summary>
        /// <param name="boat"></param>
        public void RemoveBarrel(Boat boat)
        {
            boat.AddBarrel(this.barrel);
            this._barrel = null;
        }

        /// <summary>
        /// Method to remove a barrel from a point
        /// </summary>
        /// <param name="point"></param>
        public void RemoveBarrel(Point point)
        {
            point.AddBarrel(this.barrel);
            this._barrel.AssignPoint(point);
            this._barrel = null;
        }

        /// <summary>
        /// Default update method modified to make the robot move with the barrel at the same time
        /// </summary>
        /// <param name="tick"></param>
        /// <returns></returns>
        public override bool Update(int tick)
        {
            if (tasks != null && tasks.Any())
            {
                if (tasks.First().TaskComplete(this))
                {
                    tasks.RemoveAt(0);

                    if (tasks.Count == 0)
                    {
                        tasks = null;
                    }
                }
                if (tasks != null)
                {
                    tasks.First().StartTask(this);
                }
            }
            if (route.Count > 1)
            {
                this.Move(route[1]);
                if (this.barrel != null)
                {
                    _barrel.Move(this._x, this._y + 1, this._z);
                }
            }
            return base.Update(tick);
        }
    }
}
