using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Point
    {
        private decimal _x;
        private decimal _y;
        private decimal _z;
        private List<Point> _nodes = new List<Point>();
        private decimal _cost;
        private Point _path;
        private Barrels _barrel;

        public List<Point> nodes { get { return _nodes; } }
        public decimal cost { get { return _cost; } }
        public Point path { get { return _path; } }
        public decimal x { get { return _x; } }
        public decimal y { get { return _y; } }
        public decimal z { get { return _z; } }
        public Barrels barrel { get { return _barrel; } }

        /// <summary>
        /// /The constructor for creating a point
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        public Point(decimal x, decimal y, decimal z)
        {
            this._x = x;
            this._y = y;
            this._z = z;
        }

        /// <summary>
        /// Method to add a point as a node to the list of nodes
        /// </summary>
        /// <param name="node"></param>
        public void AddNode(Point node)
        {
            if (!nodes.Contains(node))
            {
                _nodes.Add(node);
                node.AddNode(this);
            }
        }

        /// <summary>
        /// Method add a list of points to a nodelist
        /// </summary>
        /// <param name="nodeList"></param>
        public void AddNode(List<Point> nodeList)
        {
            foreach (Point node in nodeList)
            {
                this.AddNode(node);
            }
        }

        /// <summary>
        /// Method to assign barrel to this point
        /// </summary>
        /// <param name="barrel"></param>
        public void AddBarrel(Barrels barrel)
        {
            if (barrel != null)
            {
                barrel.AssignPoint(this);
            }
            this._barrel = barrel;
        }

        /// <summary>
        /// Method to set the cost of a point, used in the Dijkstra algorithm
        /// </summary>
        /// <param name="cost"></param>
        public void SetCost(decimal cost)
        {
            this._cost = cost;
        }

        /// <summary>
        /// Method to set the path of a point or points, used in the Dijkstra algorithm
        /// </summary>
        /// <param name="path"></param>
        public void SetPath(Point path)
        {
            this._path = path;
        }
    }
}