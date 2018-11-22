using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Barrels : Model3D, IUpdatable
    {
        private decimal _x = 0;
        private decimal _y = 0;
        private decimal _z = 0;
        private decimal _rX = 0;
        private decimal _rY = 0;
        private decimal _rZ = 0;

        public string type { get; }
        public Guid guid { get; }
        public decimal x { get { return _x; } }
        public decimal y { get { return _y; } }
        public decimal z { get { return _z; } }
        public decimal rotationX { get { return _rX; } }
        public decimal rotationY { get { return _rY; } }
        public decimal rotationZ { get { return _rZ; } }

        public bool needsUpdate = true;

        public Barrels(Point point)
        {
            this.type = "barrels";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;
        }

        public virtual void Move(decimal x, decimal y, decimal z) {
            this._x = x;
            this._y = y;
            this._z = z;

            needsUpdate = true;
        }

        public virtual void Rotate(decimal rotationX, decimal rotationY, decimal rotationZ) {
            this._rX = rotationX;
            this._rY = rotationY;
            this._rZ = rotationZ;

            needsUpdate = true;
        }

        public virtual bool Update(int tick)
        {
            if(needsUpdate) {
                needsUpdate = false;
                return true;
            }
            return false;
        }
    }
}