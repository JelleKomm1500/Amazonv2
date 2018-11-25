using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Barrels : Model3D, IUpdatable
    {
        private Point _point;
        public Point point { get { return _point; } }

        /// <summary>
        /// Constructor for creating Barrels with a position
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="rotationX"></param>
        /// <param name="rotationY"></param>
        /// <param name="rotationZ"></param>
        public Barrels(decimal x, decimal y, decimal z, decimal rotationX, decimal rotationY, decimal rotationZ)
        {
            this.type = "barrels";
            this.guid = Guid.NewGuid();

            this._x = x;
            this._y = y;
            this._z = z;

            this._rX = rotationX;
            this._rY = rotationY;
            this._rZ = rotationZ;
        }

        /// <summary>
        /// Constructor for creating Barrels with a point
        /// </summary>
        /// <param name="point"></param>
        public Barrels(Point point)
        {
            this.type = "barrels";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;

            this._point = point;
            point.AddBarrel(this);
        }

        /// <summary>
        /// Method to set the point
        /// </summary>
        /// <param name="point"></param>
        public void AssignPoint(Point point)
        {
            this._point = point;
        }
    }
}