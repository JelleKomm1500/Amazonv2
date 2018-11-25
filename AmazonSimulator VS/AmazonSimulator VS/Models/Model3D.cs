using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public abstract class Model3D
    {
        protected decimal _x = 0;
        protected decimal _y = 0;
        protected decimal _z = 0;
        protected decimal _rX = 0;
        protected decimal _rY = 0;
        protected decimal _rZ = 0;

        public string type;
        public Guid guid;
        public decimal x { get { return _x; } }
        public decimal y { get { return _y; } }
        public decimal z { get { return _z; } }
        public decimal rotationX { get { return _rX; } }
        public decimal rotationY { get { return _rY; } }
        public decimal rotationZ { get { return _rZ; } }
        public bool needsUpdate = true;

        /// <summary>
        /// The base move method, changing the position and the needsupdate
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        public virtual void Move(decimal x, decimal y, decimal z)
        {
            this._x = x;
            this._y = y;
            this._z = z;

            needsUpdate = true;
        }

        /// <summary>
        /// The base rotate method, changing the rotation and the needsupdate
        /// </summary>
        /// <param name="rotationX"></param>
        /// <param name="rotationY"></param>
        /// <param name="rotationZ"></param>
        public virtual void Rotate(decimal rotationX, decimal rotationY, decimal rotationZ)
        {
            this._rX = rotationX;
            this._rY = rotationY;
            this._rZ = rotationZ;

            needsUpdate = true;
        }

        /// <summary>
        /// The base update method, used to make the application tick 50 times every second
        /// </summary>
        /// <param name="tick"></param>
        /// <returns></returns>
        public virtual bool Update(int tick)
        {
            if (needsUpdate)
            {
                needsUpdate = false;
                return true;
            }
            return false;
        }
    }
}